import { ChangeEvent, useRef } from 'react'

import Avatar from './Avatar'

interface AvatarInputProps {
    avatarUrl: string | null
    onChange: (file: File) => void,
    isUploading?: boolean
}

export default function AvatarInput({ avatarUrl, onChange, isUploading = false }: AvatarInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

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