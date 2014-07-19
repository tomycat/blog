var s = '{#if (a+(b-c*d/(ef%3)))}'
          + 'blah blah'
      + '{/if}';
var temple = Temple.compile(s);

temple.render({a:1,b:2,c:3,d:4,ef:5});