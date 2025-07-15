const handler = async (request: Request) => {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    url.pathname = "/index.html";
  }
  const filePath = `./public${url.pathname}`;

  try {
    const file = await Deno.readFile(filePath);    
    return new Response(file, {
      headers: { "Content-Type": getContentType(filePath) },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
};

const getContentType = (filePath: string) => {
  const extension = filePath.substring(filePath.lastIndexOf('.'));
  switch (extension) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".json":
      return "application/json";
    default:
      return "text/plain";
  }
};

Deno.serve(handler);