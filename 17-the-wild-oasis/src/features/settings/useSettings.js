import { getSettings } from '@src/services/apiSettings';
import { useQuery } from '@tanstack/react-query';

export function useSettings() {
  const { isPending: isLoading, data: settings } = useQuery({
    queryFn: getSettings,
    queryKey: ['settings'],
  });

  return { isLoading, settings };
}
