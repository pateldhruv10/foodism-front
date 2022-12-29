import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import Notify from 'src/boot/notification';

export default function useDownload() {

  const readFile = async (result) => {
    await Filesystem.readFile({
      path: result,
      directory: Directory.ExternalStorage,
    })
  }

  const fileWrite = async (data, fileName) => {
    if(!Filesystem.checkPermissions) {
      await Filesystem.requestPermissions('EXTERNAL_STORAGE')
    }

    try {
      const result = await Filesystem.writeFile({
        path: `/Download/${fileName}`,
        data: data,
        directory: Directory.ExternalStorage,
        encoding: Encoding.UTF8
      })

      console.log('Wrote file', result);
      Notify.success('File downloaded successfully. Check your download folder.');
    } catch(e) {
      console.error('Unable to write file', e);
    }
  }

  return { fileWrite, readFile }
}
