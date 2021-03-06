class PostsController < ApplicationController
  before_action :load_post, only: [:show, :edit, :destroy]

  def show
    comments = @post.comments.select :id, :user_id, :post_id, :content, :created_at
    @comments = comments.order created_at: :asc
  end

  def create
    post = current_user.posts.build post_params

    if post.save
      flash.now[:success] = t ".success"
      redirect_to post
    else
      flash.now[:danger] = t ".fail"
      redirect_to root_url
    end
  end

  def edit
  end

  def update
    if @post.update_attributes post_params
      flash[:success] = t ".updated"
      redirect_to @post
    else
      flash.now[:danger] = t ".fail_update"
      render :edit
    end
  end

  def destroy
    if @post.destroy
      flash[:success] = t ".deleted"
    else
      flash[:danger] = t ".fail"
    end
    redirect_to request.referrer || root_url
  end

  private

  def load_post
    @post = Post.find_by id: params[:id]
    render file: "public/404.html", layout: false unless @post
  end

  def post_params
    params.require(:post).permit :title, :content, :picture, :all_tags
  end
end
