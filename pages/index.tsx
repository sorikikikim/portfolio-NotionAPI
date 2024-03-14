import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const fetchFromNotion = async () => {
        const res = await fetch('http://localhost:3000/api/notion');
        const data = await res.json();
        return JSON.parse(data);
    };

    // 비동기 함수를 호출하고 데이터를 받은 후에 상태로 설정
    const [rows, setRows] = useState<rowsStructured>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchFromNotion();
            setRows(result);
        };

        fetchData();
    }, []); // 렌더링 후에 한 번만 호출되도록 빈 배열을 전달

    // 데이터가 없는 경우 로딩 상태 또는 에러 상태를 처리할 수 있음
    if (!rows) {
        return <div>Loading...</div>;
    }
    console.log('rows on front end ---------', rows);

    return (
        <div className="maw-w-7xl mx-auto pt-16 flex flex-col">
            <h1 className="text-4xl font-bold mb-8">Our notion database</h1>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tr"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tr"
                                    >
                                        title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tr"
                                    >
                                        URL
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative px-6 py-3"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rows.map((row, i) => (
                                    <tr key={`row-${i}-${row.name}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {row.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {row.first_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <a href={row.url}> {row.url}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
