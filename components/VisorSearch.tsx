import { Input } from '@chakra-ui/input';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
};

const VisorSearch = (props: Props) => {
  const { value, setValue } = props;

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <Input value={value} onChange={handleInputValue} />;
};

export default VisorSearch;
