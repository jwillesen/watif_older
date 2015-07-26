class Api::BooksController < Api::ApiController
  def index
    render json: [{
      id: 1,
      author: 'Sir Duckins',
      title: 'The Duck and Me',
      description: %(There is a duck. And there is me. And I'm not sure which one is which),
      thumbnailUrl: "/images/duck.jpg",
      packageUrl: "/api/books/42/package",
    },{
      id: 2,
      author: 'Tarmin Andazin',
      title: 'The Ruby Sword',
      description: %(Can you find the ruby sword before it is too late?),
      thumbnailUrl: "/images/duck.jpg",
      packageUrl: "/api/books/84/package",
    },{
      id: 3,
      author: 'Tarmin Andazin',
      title: 'The Ruby Sword',
      description: %(Can you find the ruby sword before it is too late?)*10,
      thumbnailUrl: "/images/duck.jpg",
      packageUrl: "/api/books/84/package",
    },{
      id: 4,
      author: 'Tarmin Andazin',
      title: 'The Ruby Sword',
      description: %(Can you find the ruby sword before it is too late?),
      thumbnailUrl: "/images/duck.jpg",
      packageUrl: "/api/books/84/package",
    },{
      id: 5,
      author: 'Tarmin Andazin',
      title: 'The Ruby Sword',
      description: %(Can you find the ruby sword before it is too late?),
      thumbnailUrl: "/images/duck.jpg",
      packageUrl: "/api/books/84/package",
    }]
  end
end
