import { getStatusIcon, getStatusText } from "@/utils"
import Link from "next/link"

const Card = ({book}) => {
  return (
    <Link href={`/home/books/edit/${book._id}`} className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  {getStatusIcon(book.status)}
                </div>
                
                <h3 className="font-bold text-lg text-black mb-2 line-clamp-2">{book.bookName}</h3>
                <p className="text-gray-600 mb-2">by {book.authorName}</p>
    
                <p className="text-gray-600 mb-2">{book.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-800">{getStatusText(book.status)}</span>

                </div>
              </Link>
  )
}

export default Card
