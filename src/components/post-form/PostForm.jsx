import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            userName: post?.userName || "",
        },
    });

    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    if (!auth.status) {
        return (
            <p className="text-center text-red-600 mt-10 text-lg">
                You must be logged in to create or edit posts.
            </p>
        );
    }

    if (!auth.userData) {
        return (
            <p className="text-center text-blue-600 mt-10 text-lg">
                Loading user info...
            </p>
        );
    }

    const userData = auth.userData;

    const slugTransform = useCallback((value) => {
        return value
            ?.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g, "-") || "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        try {
            let file = null;

            // ✅ Upload image manually
            if (data.image?.[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
            }

            // ✅ Create new post
            if (!post) {
                const newPost = await appwriteService.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    status: data.status,
                    featuredImage: file?.$id || null,
                    userId: userData.$id,
                    userName: userData.name,
                });

                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                }
            } else {
                // ✅ Update post
                if (file && post.featuredImage) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const updatedPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (updatedPost) {
                    navigate(`/post/${updatedPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error submitting post form:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col lg:flex-row gap-8 py-8"
        >
            {/* Left: Content & Fields */}
            <div className="w-full lg:w-2/3">
                <Input
                    label="Title"
                    placeholder="Enter post title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="Enter post slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right: Image, Status, Submit */}
            <div className="w-full lg:w-1/3 flex flex-col space-y-4">
                <label className="block font-medium mb-1">Featured Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post?.featuredImage && (
                    <div className="rounded-lg overflow-hidden border border-gray-300">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt="Preview"
                            className="object-cover w-full h-48"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Post Status"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    className="w-full"
                    bgColor={post ? "bg-green-600" : "bg-blue-600"}
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
