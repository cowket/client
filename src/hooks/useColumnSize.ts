import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useEffect, useState } from 'react';

type Columns = {
  channel: number;
  chatroom: number;
};

export default function useColumnSize(): Columns {
  const [columns, setColumns] = useState<Columns>({
    channel: 1,
    chatroom: 3,
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (matches) {
      setColumns({ channel: 1, chatroom: 3 });
    } else {
      setColumns({ channel: 1, chatroom: 1 });
    }
  }, [matches]);

  return columns;
}
