// mouse.js
import { ref } from 'vue'

// by convention, composable function names start with "use"
export default function useDialog() {
  const allpopup = ref(false)
  const currentFrom = ref(null)
  const currentField = ref(null)
  const sendValue = ref(null)
  const sendDisplayField = ref(null)
  const dialogClass = ref(null)
  const sendOptions = ref(null)

  const open = (ele, val, fieldName, displayField, options = []) => {
    allpopup.value = true
    currentFrom.value = ele
    currentField.value = fieldName
    sendValue.value = val
    sendDisplayField.value = displayField
    sendOptions.value = options

    if (
      ele == 'event-participants' ||
      ele == 'add-ingredient' ||
      ele == 'add-utensil' ||
      ele == 'add-rcp-step' ||
      ele == 'contest-form' ||
      ele == 'search-ingredient' ||
      ele == 'add-brand' ||
      ele == 'city-selector' ||
      ele == 'user-option' ||
      ele == 'block-user'
    ) {
      dialogClass.value = 'full-popup add-ing'
    } else if (
      ele == 'cropper-dialog' ||
      ele == 'remove-contest' ||
      ele == 'is-logout' ||
      ele == 'qty-missing' ||
      ele == 'emoji-selection' ||
      ele == 'share-popup' ||
      ele == 'save-draft' ||
      ele == 'join-contest' ||
      ele == 'registration-success' ||
      ele == 'final-note' ||
      ele == 'thank-submit' ||
      ele == 'acc-delete' ||
      ele == 'acc-deleted' ||
      ele == 'details-updated'
    ) {
      dialogClass.value = 'center-popup'
    } else {
      dialogClass.value = ''
    }
  }

  return {
    allpopup,
    currentFrom,
    currentField,
    sendValue,
    sendDisplayField,
    dialogClass,
    sendOptions,
    open,
  }
}
