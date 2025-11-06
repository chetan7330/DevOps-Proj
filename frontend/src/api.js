const API_BASE = process.env.REACT_APP_API_URL || '';

export async function get(path) {
  const res = await fetch(API_BASE + path);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function post(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function put(path, body) {
  const res = await fetch(API_BASE + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function del(path) {
  const res = await fetch(API_BASE + path, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) throw new Error(await res.text());
}
