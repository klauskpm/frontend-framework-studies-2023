import { useEffect, useRef, useState } from 'react'
import { supabase } from '../features/supabase/supabaseClient'
import { downloadImage } from '../helpers/downloadImage'
import Avatar from './Avatar'

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

  async function uploadAvatar(event: any) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

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
        onChange={uploadAvatar}
        disabled={uploading}
        ref={fileRef}
      />
    </div>
  )
}