import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { MyVisorUptime, VisorUptime } from '../interfaces';
import { saveMyVisorsData } from '../state/slices/myVisorsSlice';
import { getMyVisorsList } from '../utils/functions/getVisorsList';

interface UseMyVisorsList {
  myVisorsList: VisorUptime[] | undefined;
  handlers: {
    handleMyVisorsList: () => void;
  };
}

const useMyVisorsList = (): UseMyVisorsList => {
  const [myVisorsList, setMyVisorsList] = useState<MyVisorUptime[] | undefined>(
    undefined
  );
  const myVisorsSelector = useSelector(
    (state: RootStateOrAny) => state.myVisors.visors
  );
  const visorsUptimeListSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  );
  const dispatch = useDispatch();
  const USE_FAKE_DATA = true;

  console.log({ myVisorsSelector });
  console.log({ myVisorsList });

  // TODO: Make all this readable
  useEffect(() => {
    const shouldGetData = myVisorsSelector.length < 1;
    if (shouldGetData) {
      getMyVisorsList(USE_FAKE_DATA).then((data) =>
        dispatch(saveMyVisorsData(data))
      );
    }
  }, [USE_FAKE_DATA, dispatch, myVisorsSelector.length]);

  useEffect(() => {
    const myVisorsDataList = visorsUptimeListSelector.filter((visor) => {
      return myVisorsSelector.some((myVisor) => visor.key === myVisor.key);
    });
    setMyVisorsList(myVisorsDataList);
  }, [myVisorsSelector, visorsUptimeListSelector]);

  const handlers = React.useMemo(
    () => ({
      handleMyVisorsList: () => console.log('handleMyVisorsList'),
    }),
    []
  );

  return { myVisorsList, handlers };
};

export default useMyVisorsList;
