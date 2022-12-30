import { FormEvent, MouseEvent } from 'react';
import { elixirClient } from 'lib/axios';
import { HTTPMethod, Monitor, MonitorResponse } from 'models/monitor';

export default function monitor() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = event.currentTarget.json.value;

    let monitorBody: Monitor = {
      body: body,
      interval: 300,
      method: HTTPMethod.POST,
      name: 'ECHO POST',
      url: 'https://textrv2.ngrok.io/items',
      user_ids: [1],
    };

    const token =
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cHRpbWVfY2hlY2tlciIsImV4cCI6MTY4MDEyMjQ5NCwiaWF0IjoxNjY0NTcwNDk0LCJpc3MiOiJ1cHRpbWVfY2hlY2tlciIsImp0aSI6ImJmNTUzN2RjLWJiMTUtNDAzZC05YWQwLWY3MTdhMjI2YjU1YyIsIm5iZiI6MTY2NDU3MDQ5Mywic3ViIjoiMSIsInR5cCI6ImFjY2VzcyJ9.H50KVNO9Q4XUclXAif2LtRsss-wYLpFGl8iymGJ1SvY97iEsI6tNxcAXwt4ilKJtufJrQttqrJEh7EzusyLzyg';

    const { data, status } = await elixirClient.post<MonitorResponse>(`/monitors`, monitorBody, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data);
    const monitor = data.data;
    console.log(monitor);
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { data, status } = await elixirClient.get<MonitorResponse>(`/status`);
    const monitor = data.data;
    console.log(monitor);
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="json">JSON</label>
        <textarea id="json" name="json" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
