import { useEffect, useState } from 'react'
import { supabase } from '../features/supabase/supabaseClient'
import { downloadImage } from '../helpers/downloadImage'
import Avatar from './Avatar'

// AvatarProps
interface AvatarInputProps {
    url: string|null
    size: number
    onUpload: (event: any, filePath: string) => void
}

export default function AvatarInput({ url, size, onUpload }: AvatarInputProps) {
  const [avatarUrl, setAvatarUrl] = useState<string|null>(null)
  const [uploading, setUploading] = useState(false)

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

  return (
    <div>
      {avatarUrl ? (
        <Avatar size="big" avatarUrl={avatarUrl} />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}