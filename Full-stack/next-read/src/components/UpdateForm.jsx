"use client";
import { updateBook } from '@/actions/books';
import React, { useActionState } from 'react'

const UpdateForm = ({book}) => {
    const [state, action, isPending] = useActionState(updateBook); 
  const statusOptions = [
    { defaultValue: "want-to-read", label: "Want to Read", color: "text-gray-600" },
    { defaultValue: "currently-reading", label: "Currently Reading", color: "text-blue-600" },
    { defaultValue: "completed", label: "Completed", color: "text-green-600" },
  ];
return (
   <form action={action} className="p-6 space-y-6">
            {/* Book Name */}
            <input type="hidden" name="id" defaultValue={book._id} />
            <div>
              <label htmlFor="bookName" className="block text-sm font-medium text-gray-700 mb-2">
                Book Name *
              </label>
              <input
                type="text"
                id="bookName"
                name="bookName"
                defaultValue={state?.bookName|| book?.bookName}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  state?.errors?.bookName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter book title"
              />
              {state?.errors?.bookName && <p className="mt-1 text-sm text-red-600">{state?.errors?.bookName}</p>}
            </div>

            {/* Author Name */}
            <div>
              <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                id="authorName"
                defaultValue={state?.authorName|| book?.authorName}
                name="authorName"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  state?.errors?.authorName ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter author name"
              />
              {state?.errors?.authorName && <p className="mt-1 text-sm text-red-600">{state?.errors?.authorName}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={state?.description || book?.description}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  state?.errors?.description ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Enter book description or your thoughts about it"
              />
              {state?.errors?.description && (
                <p className="mt-1 text-sm text-red-600">{state?.errors?.description}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Reading Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={book?.status}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {statusOptions.map((option) => (
                  <option key={option.defaultValue} defaultValue={option.defaultValue} value={option.defaultValue} >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating Book...
                  </span>
                ) : (
                  "Update Book"
                )}
              </button>
            </div>
          </form>
  )
}

export default UpdateForm
