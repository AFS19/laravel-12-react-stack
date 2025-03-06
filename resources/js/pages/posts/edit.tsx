import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';
import { Textarea } from "@/components/ui/textarea"



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Post',
        href: '/posts/edit',
    },
];

export default function EditPost({ currentPost }: { currentPost: Post }) {

    const [title, setTitle] = useState<string>(currentPost.title);
    const [content, setContent] = useState<string>(currentPost.content);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>('');
    const {errors} = usePage().props;

    console.log(title)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('posts.update', currentPost.id), {
            _method: 'PUT',
            title,
            content,
            image,
        })
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />
            <div className='flex h-full flex-1 flex-col justify-center items-center'>
                <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 rounded-xl p-6 w-full">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="title"
                                    defaultValue={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="first post"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="image"
                                    onChange={handleFileChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="image preview" className="w-full h-40 object-cover" />
                                )}
                                <InputError message={errors.image} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    defaultValue={content}
                                    placeholder="write somthing about the post..."
                                    onChange={(e) => setContent(e.target.value)} />
                                <InputError message={errors.content} />
                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4}>
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
