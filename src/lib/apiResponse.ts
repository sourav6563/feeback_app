export const createResponse = (
  success: boolean,
  message: string,
  status: number,
  data?: any,
  errors?: any
) => {
  return Response.json({ success, message, data, errors }, { status });
};
