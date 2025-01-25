import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Select } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import databaseService from "../../appwrite/database";
import storageService from '../../appwrite/storage';

function PostForm({ post = null }) {
    const user = useSelector(state => state.auth.userData);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
            slug: post?.slug || '',
        }
    });

    const slugTransform = (value) => {
        if (!value) return '';
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-zA-Z\d\s-]/g, "-")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-"); // Replace multiple consecutive hyphens with single hyphen
    };

    const form = async (data) => {
        if (!user?.$id) {
            setError('User not authenticated');
            return;
        }

        try {
            setIsSubmitting(true);
            const { title, content, status, slug } = data;
            let featuredImg = null;

            if (data.image?.[0]) {
                const file = await storageService.createFile(data.image[0]);
                featuredImg = file?.$id;
            }

            if (post?.$id) {
                // Update existing post
                if (featuredImg) {
                    // Delete old image if new one is uploaded
                    post.featuredImg && await storageService.deleteFile(post.featuredImg);
                }

                await databaseService.updateDocument(post.$id, {
                    title,
                    content,
                    status,
                    slug,
                    featuredImg: featuredImg || post.featuredImg,
                });
            } else {
                // Create new post
                await databaseService.createDocument({
                    title,
                    content,
                    status,
                    slug,
                    userId: user.$id,
                    featuredImg,
                });
            }

            // navigate('/');
            window.location.href = '/';
        } catch (err) {
            console.error('Error in form submission:', err);
            setError(err.message || 'An error occurred while saving the post');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    return (
        <form onSubmit={handleSubmit(form)} className="w-screen px-3 py-5 space-x-2 min-h-screen flex bg-slate-800">
            {error && <div className="text-center text-red-600 mb-4">{error}</div>}
            <div className="left flex-col flex space-y-2">
                <div className="flex flex-col space-y-1">
                    <Input 
                        label="Title" 
                        placeholder="Enter your title..."
                        {...register("title", {
                            required: "Title is required"
                        })}
                    />
                    {errors.title && <div className="text-sm text-red-600">{errors.title.message}</div>}
                </div>
                <RTE name="content" control={control} initialValue={getValues("content")} />
            </div>
            <div className="right flex-col flex space-y-2">
                <div className="flex flex-col space-y-1">
                    <Input 
                        type="file"
                        accept="image/*"
                        placeholder="Give your blog image"
                        {...register("image", {
                            required: !post ? "Please select an image" : false
                        })}
                    />
                    {errors.image && <div className="text-sm text-red-600">{errors.image.message}</div>}
                </div>
                <div className="flex flex-col space-y-1">
                    <Select 
                        options={["active", "inactive"]}
                        {...register("status", {
                            required: "Please select a status"
                        })}
                    />
                    {errors.status && <div className="text-sm text-red-600">{errors.status.message}</div>}
                </div>
                <div className="flex flex-col space-y-1">
                    <Input 
                        label="Slug"
                        placeholder="Enter your slug..."
                        {...register("slug", {
                            required: "Slug is required"
                        })}
                    />
                    {errors.slug && <div className="text-sm text-red-600">{errors.slug.message}</div>}
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-2 py-1 bg-black text-white disabled:bg-gray-500"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
}

export default PostForm;