"use client"

import { useState, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { CloudUpload, InsertDriveFile, Close } from "@mui/icons-material"
import LinearProgress from "@mui/material/LinearProgress"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"

const UploadFile = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const dropzoneRef = useRef(null)

  // Handle file selection
  const handleFileSelection = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setSelectedFile(file)
    setShowDialog(true)
  }

  // Handle file import confirmation
  const handleImportConfirm = () => {
    setShowDialog(false)
    setUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setFile(selectedFile)
        setUploading(false)
        setIsCollapsed(true)
      }
    }, 150)
  }

  // Cancel import
  const handleImportCancel = () => {
    setShowDialog(false)
    setSelectedFile(null)
  }

  // Remove uploaded file
  const removeFile = () => {
    setFile(null)
    setIsCollapsed(false)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "application/json": [".json"],
      "text/markdown": [".md"],
    },
    onDrop: handleFileSelection,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Upload Progress Bar */}
      {uploading && (
        <div className="px-4 py-2 bg-white">
          <p className="text-sm font-medium mb-1">Uploading: {selectedFile?.name}</p>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </div>
      )}

      {/* Collapsed Upload Area */}
      {isCollapsed && file && (
        <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudUpload style={{ fontSize: 16 }} className="text-gray-600" />
            <span className="text-sm font-medium">Upload Files</span>
          </div>
          <button onClick={() => setIsCollapsed(false)} className="text-xs text-blue-600 hover:text-blue-800">
            Expand
          </button>
        </div>
      )}

      {/* Dropzone Area */}
      {!isCollapsed && (
        <div
          {...getRootProps()}
          ref={dropzoneRef}
          className="flex flex-col justify-center items-center flex-1 mx-4 my-2 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-gray-500 transition-all"
        >
          <input {...getInputProps()} />
          <CloudUpload className="mx-auto mb-2" style={{ fontSize: 40, color: "#6b7280" }} />
          <p className="font-medium text-gray-700">Drag files here or click to browse</p>
          <span className="text-xs text-gray-500 mt-1">Accepted file types: .pdf, .docx, .txt, .json, .md</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {file && (
        <div className="mt-2 mx-4 mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h3>
          <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <InsertDriveFile style={{ fontSize: 20 }} className="text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button onClick={removeFile} className="text-gray-500 hover:text-red-600 transition-colors">
              <Close style={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      )}

      {/* Import Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>Import File</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to import the following file?</DialogContentText>
          {selectedFile && (
            <div className="p-4 bg-gray-100 rounded-lg mt-2">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleImportConfirm} color="primary">
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UploadFile

