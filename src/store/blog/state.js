import { getWithExpiry } from '../../utils/storage';

export default function () {
  return {
    drawer: false,
    blogs: getWithExpiry('blogs') ?? [],
  }
}
