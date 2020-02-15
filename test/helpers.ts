export function getAjaxRequest(): Promise<any> {
  return Promise.resolve(jasmine.Ajax.requests.mostRecent())
}
