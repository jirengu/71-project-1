const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

const searchMap = {
  'baidu': 'https://www.baidu.com/s?wd=',
  'bing': 'https://cn.bing.com/search?q='
}
let searchType = 'baidu'
let pageStatus = 'setting'   // preview
const data = [{
  title: '常用网站',
  data: [
    {
      name: '饥人谷1',
      url: 'https://jirengu.com'
    },
    {
      name: '知乎',
      url: 'https://zhihu.com'
    }
  ]
},{
  title: '精品博客',
  data: [
    {
      name: '阮一峰',
      url: 'https://javascript.ruanyifeng.com'
    },
    {
      name: '若愚',
      url: 'https://zhuanlan.zhihu.com/study-fe'
    }
  ]
}] 



$$('.search-tab').forEach($tab => {
  console.log($tab)
  $tab.onclick = function() {
    $$('.search-tab').forEach($tab => $tab.classList.remove('active'))
    this.classList.add('active')
    searchType = this.dataset.type
  }
})

document.onkeyup = function(e) {
  if(e.key === 'Enter') {
    search()  
  }
}

$('.icon-search').onclick = search

$('.icon-setting').onclick = function() {
  pageStatus = 'setting'
  $('body').classList.remove('preview')
  $('body').classList.add('setting')
}

$('.icon-back').onclick = function() {
  pageStatus = 'preview'
  $('body').classList.remove('setting')
  $('body').classList.add('preview')
}

$('.icon-plus').onclick = function() {
  $('.modal-1').classList.add('show')
}

$('.modal-1 .cancel').onclick = function() {
  $('.modal-1').classList.remove('show')
}

$('.modal-1 .confirm').onclick = function() {
  let value = $('.modal-1 input').value
  if(value === '') {
    alert('输入不能为空')
    return
  }
  let obj = {
    title: value,
    data: []
  }
  data.push(obj)
  render(data)
  $('.modal-1').classList.remove('show')
}


$('.list').onclick = function(e) {
  console.log(e.path)
  let $delete = e.path.find($node => $node.classList&&$node.classList.contains('icon-delete'))
  if(!$delete) return
  let $result = e.path.filter($node => $node.classList&&$node.classList.contains('item'))
  if($result.length > 0) {
    let $item = $result[0]
    let index = [...$$('.item')].indexOf($item)
    console.log(index)
    data.splice(index, 1)
    render(data)
  }
  console.log($result )
}

function search() {
  let url = searchMap[searchType] + $('.search-input input').value
  const $link = document.createElement('a')
  $link.setAttribute('href', url)
  $link.setAttribute('target', '_blank')
  $link.click()
}

/**
[{
  title: '常用网站',
  data: [
    {
      name: '饥人谷',
      url: 'https://jirengu.com'
    },
    {
      name: '知乎',
      url: 'https://zhihu.com'
    }
  ]
},{
  title: '精品博客',
  data: [
    {
      name: '阮一峰',
      url: 'https://javascript.ruanyifeng.com'
    },
    {
      name: '若愚',
      url: 'https://zhuanlan.zhihu.com/study-fe'
    }
  ]
}] 


        <li class="item">
          <h2>常用网站 <span></span></svg></h2>
          <ul class="panel">
            <li class="tag">百度</li>
            <li class="tag">知乎</li>
          </ul>
        </li>
        <li class="item">
          <h2>常用网站</h2>
          <ul class="panel">
            <li class="tag">百度</li>
            <li class="tag">知乎</li>
          </ul>
        </li>
     
 */



render(data)

/* 
        <li class="item">
          <h2>常用网站<span></span></h2>
          <ul class="panel">
            <li class="tag"><a href="" target="_blank">百度</a> </li>
            <li class="tag"><a href="" target="_blank">百度</a></li>
          </ul>
        </li>
*/

function render(data) {
  const $itemArr =  data.map(obj => {
    const $item = document.createElement('li')
    $item.classList.add('item')
    const $h2 = document.createElement('h2')
    $h2.append(obj.title)
    const $iconSpan = document.createElement('span')
    $iconSpan.innerHTML = '<svg class="icon icon-delete" aria-hidden="true"><use xlink:href="#icon-delete"></use>'
    $h2.append($iconSpan)
    const $ul = document.createElement('ul')
    $ul.classList.add('panel')
    let $liArray = obj.data.map(item => {
      const $tag = document.createElement('li')
      $tag.classList.add('tag')
      const $a = document.createElement('a')
      $a.setAttribute('href', item.url)
      $a.setAttribute('target', '_blank')
      $a.append(item.name)
      $tag.append($a)
      return $tag
    })
    $ul.append(...$liArray)
    $item.append($h2, $ul)
    return $item
  })
  
  console.log($itemArr)
  
  $('#websites .list').innerHTML = ''
  $('#websites .list').append(...$itemArr)
}

