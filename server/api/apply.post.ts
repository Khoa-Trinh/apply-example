import rewriteJobId from "~/utils/rewriteJobId";
import rewriteRole from "~/utils/rewriteRole";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiUrl = config.apiUrl;
  const { jobId, role } = getQuery(event);
  if (!jobId || !role) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing jobId or role",
    });
  }

  const reqUrl = `${apiUrl}/api/v1/apply/nexuron/${rewriteJobId(
    jobId as string
  )}/${rewriteRole(role as string)}/`;

  const body = await readBody(event);

  const response = await $fetch(reqUrl, {
    method: "POST",
    body,
  });

  return response;
});
