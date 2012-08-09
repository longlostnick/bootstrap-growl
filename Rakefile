# special thanks to https://github.com/tuupola/jquery_lazyload for this cool Rakefile
task :default => [:minify]

desc "Minify"
task :minify do
  begin
    require 'uglifier'
  rescue LoadError => e
    if verbose
      puts "\nYou'll need the 'uglifier' gem for minification. Just run:\n\n"
      puts "  $ gem install uglifier"
      puts "\nand you should be all set.\n\n"
      exit
    end
    return false
  end
  puts "Minifying touch-sroll.js with UglifyJS..."
  File.open("jquery.bootstrap-growl.min.js", "w"){|f| f.puts Uglifier.new.compile(File.read("jquery.bootstrap-growl.js"))}
end
