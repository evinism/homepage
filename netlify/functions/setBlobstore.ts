import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import connection from "@netlify/planetscale";

/*
CREATE TABLE blobstore (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id varchar(255) NOT NULL,
  blob_key varchar(255) NOT NULL,
  blob_data json NOT NULL,
  CONSTRAINT user_blob UNIQUE (user_id, blob_key)
);
*/



// Data
export const handler: Handler = (event: HandlerEvent, context: HandlerContext) => {
  const user_id = context.clientContext.user;
  if (!user_id) {
    return Promise.resolve({
      statusCode: 401,
      body: "Unauthorized -- User not logged in",
    });
  }

  const { body } = event;
  if (!body) {
    return Promise.resolve({
      statusCode: 400,
      body: "Missing body",
    });
  }

  const { key, data } = JSON.parse(body);

  return connection.execute("UPSERT INTO blobstore (user_id, blob_key, blob_data) VALUES (?, ?, ?)", [
    user_id,
    key,
    data,
  ]).then(() => {
    return {
      statusCode: 201
    };
  });
}