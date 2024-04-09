import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '@src/services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['setting'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
