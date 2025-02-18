import {toast } from 'react-toastify';


export function onsuccess(msg)
{
    toast.success(msg);
}

export function onerror(msg)
{
    toast.error(msg);
}
export function oninfo(msg)
{
    toast.info(msg);
}
export function onwarning(msg)
{
    toast.warn(msg);
}