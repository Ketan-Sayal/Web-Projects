"use client";
import { createBook } from "@/actions/books";
import { useActionState } from "react";

export default function AddBookForm() {
  const [state, action, isPending] = useActionState(createBook); 

  const statusOptions = [
    { value: "want-to-read", label: "Want to Read", color: "text-gray-600" },
    { value: "currently-reading", label: "Currently Reading", color: "text-blue-600" },
    { value: "completed", label: "Completed", color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Book</h1>
          <p className="text-gray-600">Add a book to your personal library</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <form action={action} className="p-6 space-y-6">
            {/* Book Name */}
            <div>
              <label htmlFor="bookName" className="block text-sm font-medium text-gray-700 mb-2">
                Book Name *
              </label>
              <input
                type="text"
                id="bookName"
                name="bookName"
                value={state?.bookName}
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
                value={state?.authorName}
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
                value={state?.description}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
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
                    Adding Book...
                  </span>
                ) : (
                  "Add Book"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
