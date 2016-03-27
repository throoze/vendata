if ENV['EXECJS_DEBUG']
    ExecJS.runtime = ExecJS::ExternalRuntime.new(
        name: 'Node.js Debug (V8)',
        command:     ['node --debug-brk'],
        runner_path: ExecJS.root + '/support/node_runner.js',
        encoding:    'UTF-8'
    )
end