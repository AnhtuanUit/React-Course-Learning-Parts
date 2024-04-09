import { getSettings } from '@src/services/apiSettings';
import { useQuery } from '@tanstack/react-query';

export function useSetting() {
  const { isPending: isLoading, data: setting } = useQuery({
    queryFn: getSettings,
    queryKey: ['setting'],
  });

  return { isLoading, setting };
}
