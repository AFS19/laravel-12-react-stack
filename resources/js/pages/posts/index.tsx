import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import moment from 'moment'
import { toast } from "sonner"
import { useEffect } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

interface Post {
    id: number;
    title: string;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface Flash {
    success?: string;
    danger?: string;
}

export default function Posts({ posts }: { posts: Post[] }) {
    const { flash } = usePage<{ flash: Flash }>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.danger) {
            toast.error(flash.danger);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('posts.create')} className="text-indigo underline">
                        Create Post
                    </Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent posts.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[100px]'>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Updated at</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <img src={post.image} alt={post.title} className="w-12 h-12 object-cover rounded-full" />
                                    </TableCell>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.content}</TableCell>
                                    <TableCell>{moment(post.created_at).calendar()}</TableCell>
                                    <TableCell>{moment(post.updated_at).calendar()}</TableCell>
                                    <TableCell className='text-right'>
                                        <Link href={route('posts.edit', post.id)} className="text-indigo-500 lg:hover:text-indigo-700">
                                            Edit
                                        </Link>

                                        <Link href={route('posts.destroy', post.id)} method="delete" as="button" className="text-red-500 underline ml-2 cursor-pointer">
                                            Delete
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </AppLayout>
    );
}
