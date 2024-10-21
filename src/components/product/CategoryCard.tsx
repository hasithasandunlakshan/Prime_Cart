import React from 'react'

interface Props{
    category: {
        title: string,
        description : string,
        imageUrl: string
    }
}

const CategoryCard = ({category} : Props) => {
  return (
    <div className="card rounded-2xl h-64 aspect-[5/4] shadow-xl group text-white relative carousel-item">
      <figure className="absolute inset-0">
        <img
          src={category.imageUrl}
          alt={category.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="absolute inset-0 transition-opacity duration-300 card-body group-hover:opacity-0">
        <h2 className="text-2xl font-extrabold">{category.title}</h2>
      </div>
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 card-body rounded-2xl bg-black/80 group-hover:opacity-100">
        <h2 className="card-title">{category.title}</h2>
        <p>{category.description}</p>
        <div className="justify-end card-actions">
        <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">
      Shop Now
    </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryCard
