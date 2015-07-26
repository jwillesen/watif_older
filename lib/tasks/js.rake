namespace :js do
  desc "run webpack in dev mode"
  task :pack do
    sh 'node_modules/.bin/webpack --progress --colors -d'
  end

  desc "generate production code"
  task :prod do
    sh 'node_modules/.bin/webpack --progress --colors -p'
  end

  desc "Have webpack watch for changes"
  task :watch do
    sh 'node_modules/.bin/webpack --watch -d'
  end

  desc "Run javascript tests"
  task :test do
    sh 'node_modules/.bin/jest --config jest.config.json'
  end

end
