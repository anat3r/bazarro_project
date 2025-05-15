'use client'
import Cookies from 'js-cookie'

export async function setTheme(theme: 'ligth' | 'dark') {
  Cookies.set('theme', `${theme}-theme`, {
    expires: 30,
    path: '/',
    sameSite: 'lax'
  });
  console.log(`${theme}-theme`)
}

export async function deleteTheme() {
  Cookies.remove('theme', {
    path: '/',
    sameSite: 'lax'
   });
}

export async function getTheme(){
  return Cookies.get('theme')
}