Rails.application.routes.draw do
  root "static_pages#home"
  get "/about", to: "static_pages#about"
  devise_for :user, controllers: {omniauth_callbacks: "users/omniauth_callbacks"}
  devise_scope :user do
    get "signup", to: "devise/registrations#new"
    post "signup", to: "devise/registrations#create"
    get "signin", to: "devise/sessions#new"
    post "signin", to: "devise/sessions#create"
    get "edit", to: "devise/registrations#edit"
    put "edit", to: "devise/registrations#update"
  end
  resources :users, only: [:index, :show, :update] do
    member do
      get :following, :followers
    end
  end
  resources :posts, except: [:index, :new] do
    resources :comments, only: [:create, :update, :destroy]
  end
  resources :relationships, only: [:create, :destroy]
  resources :tags, only: :show
  namespace :admin do
    root "admins#index", as: :root
    resources :posts, only: [:index, :destroy]
  end
end
