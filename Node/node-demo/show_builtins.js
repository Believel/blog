// modules 是一个内置模块，包含了Node.js模块管理的信息
const { builtinModules } = require('module')
// 获取当前版本的Node.js中所有内置模块
console.log(builtinModules)

[
  '_http_agent',         '_http_client',        '_http_common',
  '_http_incoming',      '_http_outgoing',      '_http_server',
  '_stream_duplex',      '_stream_passthrough', '_stream_readable',
  '_stream_transform',   '_stream_wrap',        '_stream_writable',
  '_tls_common',         '_tls_wrap',           'assert',
  'assert/strict',       'async_hooks',         'buffer',
  'child_process',       'cluster',             'console',
  'constants',           'crypto',              'dgram',
  'diagnostics_channel', 'dns',                 'dns/promises',
  'domain',              'events',              'fs',
  'fs/promises',         'http',                'http2',
  'https',               'inspector',           'module',
  'net',                 'os',                  'path',
  'path/posix',          'path/win32',          'perf_hooks',
  'process',             'punycode',            'querystring',
  'readline',            'readline/promises',   'repl',
  'stream',              'stream/consumers',    'stream/promises',
  'stream/web',          'string_decoder',      'sys',
  'timers',              'timers/promises',     'tls',
  'trace_events',        'tty',                 'url',
  'util',                'util/types',          'v8',
  'vm',                  'worker_threads',      'zlib'
]