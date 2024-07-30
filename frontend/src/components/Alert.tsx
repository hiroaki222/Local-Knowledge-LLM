'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
export default function Alert() {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [threadDelete, setThreadDelete] = useState<null | object>(null)
  const cancelDelete = ''
  const confirmDelete = ''
  return (
    <AlertDialog onOpenChange={setIsAlertOpen} open={isAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>「{threadDelete}」を本当に削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>この操作は取り消せません。データが完全に削除されます。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelDelete}>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete}>削除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
