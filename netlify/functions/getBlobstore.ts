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



export const handler: Handler = (event: HandlerEvent, context: HandlerContext) => {
  const user_id = context.clientContext.user;
  if (!user_id) {
    return Promise.resolve({
      statusCode: 401,
      body: "Unauthorized -- User not logged in",
    });
  }

  const { key } = event.queryStringParameters;
  if (!key) {
    return Promise.resolve({
      statusCode: 400,
      body: "Missing key",
    });
  }
  return connection.execute("SELECT blob_data FROM blobstore WHERE user_id = ? AND blob_key = ?", [
    user_id,
    key,
  ]).then((result) => {
    if (result.rows.length === 0) {
      return {
        statusCode: 404,
        body: "{error: 'Not found'}",
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows[0].blob_data),
    };
  });
}