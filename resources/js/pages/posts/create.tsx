import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Post',
        href: '/posts/create',
    },
];

type PostForm = {
    title: string;
    content: string;
    image: File | null,
};

export default function CreatePost() {
    const [imagePreview, setImagePreview] = useState<string | null>('');
    const { data, setData, post, processing, errors } = useForm<PostForm>({
        title: '',
        content: '',
        image: null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('posts.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
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
                                    defaultValue={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="first post"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    required
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
                                    defaultValue={data.content}
                                    placeholder="write somthing about the post..."
                                    onChange={(e) => setData('content', e.target.value)} />
                                <InputError message={errors.content} />
                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
