import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useEffect, useState } from 'react';

export default function useDesktopSize(): boolean {
  const [isDesktopSize, setIsDesktopSize] = useState<boolean>(true);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    setIsDesktopSize(matches);
  }, [matches]);

  return isDesktopSize;
}
