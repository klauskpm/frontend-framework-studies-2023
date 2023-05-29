import { ChangeEvent, useEffect, useRef, useState } from 'react'

import Avatar from './Avatar'
import { downloadImage } from '../helpers/downloadImage'

// AvatarProps
interface AvatarInputProps {
    url: string|null
    onChange: (file: File) => void,
    isUploading?: boolean
}

export default function AvatarInput({ url, onChange, isUploading = false }: AvatarInputProps) {
  const [avatarUrl, setAvatarUrl] = useState<string|null>(null)
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (url) downloadImage(url).then((imageURL: string) => setAvatarUrl(imageURL))
  }, [url])

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    onChange(event.target.files[0]);
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
        disabled={isUploading}
        ref={fileRef}
      />
    </div>
  )
}