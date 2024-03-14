// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from '@notionhq/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string;
// };

const notionSecret = process.env.NOTION_SECRET;

const notionDatabaseID = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

type Row = {
    name: { id: string; title: { text: { content: string } }[] };
    first_name: { id: string; rich_text: { text: { content: string } }[] };
    link_to_youtube: { id: string; url: string };
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!notionSecret || !notionDatabaseID)
        throw new Error('Missing notion secret or DB-ID');

    const query = await notion.databases.query({
        database_id: notionDatabaseID,
    });
    // @ts-ignore
    // console.log(query.results[0].properties.name.title[0].text.content);
    // @ts-ignore
    const rows = query.results.map((res) => res.properties) as Row[];

    // console.log(rows[2].name.title[0].text.content);
    // console.log(rows[2].first_name.rich_text[0].text.content);
    // console.log(rows[2].link_to_youtube.url);

    // 객체 리터럴을 만들 때, 객체들의 속성을 정의하는데에는 중괄호'{}'가 아닌 괄호'()'를 사용해야 한다.
    const rowsStructured: rowsStructured = rows.map((el) => ({
        name: el.name.title[0]?.text.content,
        first_name: el.first_name.rich_text[0]?.text.content,
        url: el.link_to_youtube.url,
    }));

    // console.log(rowsStructured);

    res.status(200).json(JSON.stringify(rowsStructured));
}
