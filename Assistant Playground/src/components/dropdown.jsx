import React from 'react';
import { useState, useEffect, useRef } from "react"
import { KeyboardArrowDown } from "@mui/icons-material"

const Dropdown = ({ userName }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
          onClick={toggleDropdown}
        >
          {userName}
          <KeyboardArrowDown className="ml-1 -mr-1 h-5 w-5 text-gray-400" />
        </button>
      </div>
      {dropdownOpen && (
        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5">
          <div className="py-1 text-left text-xs font-medium text-gray-700 px-4">ASSISTANTS</div>
          <div className="py-2 text-left text-sm font-bold text-gray-700 px-4">{userName}</div>
        </div>
      )}
    </div>
  )
}

export default Dropdown

