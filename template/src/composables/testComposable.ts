import { computed } from 'vue';

/**
 * @docFile Composable
 * @docDescription This is test composable
 * @docParam {string} message - the message to capitalise
 * @docReturn {ComputedRef<string>} capitalisedMessage - the capitalised message
 */

export const testComposable = (message: string) => {
  const capitalisedMessage = computed(() => message.toUpperCase());
  return { capitalisedMessage };
};
