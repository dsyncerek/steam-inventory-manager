export interface Loadable {
  success: boolean;
  loading: boolean;
  error: any;
}

export function loadableDefault(): Loadable {
  return { loading: false, success: false, error: null };
}

export function loadableLoad(): Loadable {
  return { loading: true, success: false, error: null };
}

export function loadableSuccess(): Loadable {
  return { loading: false, success: true, error: null };
}

export function loadableError(error: any): Loadable {
  return { loading: false, success: false, error: error };
}
