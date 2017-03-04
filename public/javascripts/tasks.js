  $(document).ready( function() {
    $('#add_task').on('submit', function(e) {
      e.preventDefault();
      var title = $(this).children('input').val();

      $.ajax({
        url: '/tasks',
        type: 'POST',
        data: {title: title},
        dataType: 'JSON'
      }).done(function(data) {
        updateTaskList(data);
        $('#add_task input').val('');
          console.log(data);
      }).fail(function(msg) {
        console.log(msg);
      });
    });
  });

  function getAllTasks() {
    $.ajax({
      url: '/tasks',
      type: 'GET',
      dataType: 'JSON'
    }).done( function(data) {
      $('#add_task input').val('');
      getAllTasks();
    }).fail(function(msg) {
      console.log(msg);
    })
  };

  getAllTasks();

  function updateTaskList(tasks) {
  var list = $('#task_list');
  list.empty();
  tasks.forEach( function(task) {
  $.ajax({
    url: '/tasks/task_template',
    type: 'POST',
    dataType: 'HTML',
    data: { id: task._id, title: task.title, complete: task.complete }
  }).done( function(data) {
    list.append(data);
  }).fail( function(msg) {
    console.log(msg);
  });
});
}

  $(document).on('change', '#task_list input', function() {
    var input = $(this);
    var url = '/tasks/' + input.attr('id');
    $.ajax({
      url: url,
      type: 'PUT',
      data: { complete: input.is(':checked') }
    }).done( function(data) {
      console.log('Updated');
    }).fail( function(msg) {
      alert("Something went wrong");
      input.attr('checked', !input.is(':checked'));
    });
  });
