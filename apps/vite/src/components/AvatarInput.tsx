import { ChangeEvent, useEffect, useRef, useState } from 'react'

import Avatar from './Avatar'
import { downloadImage } from '../helpers/downloadImage'
import { uploadAvatar } from '../features/profiles/data/storage'

// AvatarProps
interface AvatarInputProps {
    url: string|null
    onUpload: (event: any, filePath: string) => void
}

export default function AvatarInput({ url, onUpload }: AvatarInputProps) {
  const [avatarUrl, setAvatarUrl] = useState<string|null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (url) downloadImage(url).then((imageURL: string) => setAvatarUrl(imageURL))
  }, [url])

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      let { error: uploadError, filePath } = await uploadAvatar(event.target.files[0])

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleClick = () => {
    fileRef?.current?.click();
  };

  return (
    <div>
      <button
        className='btn btn-secondary btn-circle w-40 h-40'
        type="button"
        onClick={handleClick}>
        <Avatar size="big" avatarUrl={avatarUrl} />
      </button>
      <input
        className='hidden'
        type="file"
        id="single"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
        ref={fileRef}
      />
    </div>
  )
}