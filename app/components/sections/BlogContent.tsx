import Image from 'next/image'

type ContentType = {
  image: string;
  imageAlt: string;
  intro: string;
  sections: Array<{
    title: string;
    type: 'text' | 'cards' | 'quote' | 'code' | 'list' | 'highlight' | 'table';
    content?: string;
    items?: Array<{
      icon?: string;
      title?: string;
      description?: string;
    }> | string[];
    quote?: string;
    author?: string;
    code?: string;
    headers?: string[];
    rows?: string[][];
  }>;
}

export default function BlogContent({ content }: { content: ContentType }) {
  return (
    <section className="py-20 px-6 bg-gray-900 bg-opacity-90">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden mb-12">
          <div className="h-64 bg-gradient-to-r from-blue-900 to-blue-800 flex items-center justify-center">
            <Image 
              src={content.image} 
              alt={content.imageAlt} 
              width={800}
              height={256}
              className="h-full object-cover w-full opacity-90" 
            />
          </div>
        </div>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          {content.intro}
        </p>

        {content.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-blue-400 mt-12 mb-6">{section.title}</h2>
            
            {section.type === 'text' && (
              <p className="text-gray-300 mb-6">{section.content}</p>
            )}
            
            {section.type === 'cards' && (
              <div className="grid md:grid-cols-3 gap-6 my-8">
                {section.items?.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6">
                    <div className="text-blue-400 text-2xl mb-3">
                      <i className={typeof item === 'object' && item.icon ? item.icon : ''}></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{typeof item === 'object' ? item.title : ''}</h3>
                    <p className="text-gray-300">{typeof item === 'object' ? item.description : ''}</p>
                  </div>
                ))}
              </div>
            )}
            
            {section.type === 'quote' && (
              <div className="border-l-4 border-blue-500 pl-4 my-8 bg-gray-800 bg-opacity-30 py-3">
                <p className="italic text-gray-300">{section.quote}</p>
                <p className="text-sm text-gray-400 mt-2">- {section.author}</p>
              </div>
            )}
            
            {section.type === 'code' && (
              <div className="bg-black bg-opacity-50 p-4 rounded-lg my-4 overflow-x-auto">
                <pre><code className="text-sm text-green-300">{section.code}</code></pre>
              </div>
            )}
            
            {section.type === 'list' && (
              <ul className="list-disc pl-5 space-y-2 my-4 text-gray-300">
                {section.items?.map((item, itemIndex) => (
                  <li key={itemIndex}>{typeof item === 'string' ? item : ''}</li>
                ))}
              </ul>
            )}
            
            {section.type === 'highlight' && (
              <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-xl p-6 mt-6">
                <h3 className="text-xl font-bold mb-3 flex items-center text-white">
                  <i className="fas fa-lightbulb text-blue-400 mr-3"></i>
                  {section.title}
                </h3>
                <p className="text-gray-300">{section.content}</p>
              </div>
            )}
            
            {section.type === 'table' && (
              <table className="w-full border border-gray-600 my-6">
                <thead className="bg-gray-700">
                  <tr>
                    {section.headers?.map((header, headerIndex) => (
                      <th key={headerIndex} className="p-3 text-left text-white">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows?.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'border-t border-gray-600' : 'border-t border-gray-600 bg-gray-700 bg-opacity-30'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-3 text-gray-300">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}