import type { NextApiRequest, NextApiResponse } from "next";

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const endpointURL = "https://api.twitter.com/2/tweets/";

type ObjectTweet = {
  data: {
    id: string;
    text: string;
    created_at: string;
    author_id: string;
    edit_history_tweet_ids: string[];
  };
  includes: {
    users: {
      id: string;
      username: string;
      name: string;
    }[];
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request = await fetch(
    `${endpointURL}${req.query.id}?tweet.fields=created_at&expansions=author_id&user.fields=username`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
  const response = (await request.json()) as ObjectTweet;
  const cleanText = response.data.text.replace(
    /(?:https?|ftp):\/\/[\n\S]+/g,
    ""
  );
  return res.status(200).json({
    text: cleanText,
    username: response.includes.users[0].username,
  });
}
